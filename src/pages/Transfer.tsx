import { useState, type FormEvent, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';
import { useAuth } from '../hooks/useAuth';
import { createTransfer } from '../services/transactionService';
import '../styles/global.css';

interface TransferFormData {
  recipientAccount: string;
  amount: number;
  description: string;
}

export default function Transfer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<TransferFormData>({
    recipientAccount: '',
    amount: 0,
    description: '',
  });
  const [errors, setErrors] = useState<Partial<TransferFormData>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  const generateIdempotencyKey = useCallback((): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const data = `${user?.email}-${timestamp}-${random}`;
    const hash = CryptoJS.SHA256(data).toString();
    return `${timestamp}-${hash.substring(0, 16)}`;
  }, [user?.email]);

  const transferMutation = useMutation({
    mutationFn: (data: { formData: TransferFormData; key: string }) => 
      createTransfer(data.formData, data.key),
    onSuccess: () => {
      alert('Transferencia realizada con éxito');
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      alert(`Error al realizar la transferencia: ${error.message}`);
      setShowConfirm(false);
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<TransferFormData> = {};

    if (!formData.recipientAccount.trim()) {
      newErrors.recipientAccount = 'El número de cuenta es obligatorio';
    } else if (!/^\d{8,16}$/.test(formData.recipientAccount.replace(/\s/g, ''))) {
      newErrors.recipientAccount = 'Ingresa un número de cuenta válido (8-16 dígitos)';
    }

    if (formData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a $0';
    } else if (formData.amount > 10000000) {
      newErrors.amount = 'El monto máximo por transferencia es $10,000,000';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length > 200) {
      newErrors.description = 'La descripción no puede exceder 200 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof TransferFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const key = generateIdempotencyKey();
      setIdempotencyKey(key);
      setShowConfirm(true);
      setTimeout(() => confirmationRef.current?.focus(), 100);
    }
  };

  const handleConfirmTransfer = () => {
    transferMutation.mutate({ formData, key: idempotencyKey });
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
    formRef.current?.focus();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAccountNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  return (
    <div className="transfer-page">
      <header className="transfer-header">
        <button 
          className="btn btn-back"
          onClick={() => navigate('/dashboard')}
        >
          ← Volver
        </button>
        <h1 className="transfer-title">Nueva transferencia</h1>
      </header>

      <main className="transfer-main">
        <form 
          ref={formRef}
          className="transfer-form" 
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="recipientAccount" className="form-label">
              Cuenta destino
            </label>
            <input
              id="recipientAccount"
              type="text"
              className={`form-input ${errors.recipientAccount ? 'form-input--error' : ''}`}
              value={formData.recipientAccount}
              onChange={(e) => handleInputChange('recipientAccount', formatAccountNumber(e.target.value))}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              autoComplete="off"
            />
            {errors.recipientAccount && (
              <span className="form-error">{errors.recipientAccount}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Monto a transferir
            </label>
            <div className="input-currency">
              <span className="input-currency__symbol">$</span>
              <input
                id="amount"
                type="number"
                className={`form-input form-input--currency ${errors.amount ? 'form-input--error' : ''}`}
                value={formData.amount || ''}
                onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                placeholder="0"
                min={1}
                max={10000000}
                step={1000}
              />
            </div>
            {errors.amount && (
              <span className="form-error">{errors.amount}</span>
            )}
            <span className="form-hint">
              Monto máximo: $10,000,000 COP
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Descripción
            </label>
            <textarea
              id="description"
              className={`form-input form-textarea ${errors.description ? 'form-input--error' : ''}`}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Ej: Pago de servicios, Transferencia a familia..."
              maxLength={200}
              rows={3}
            />
            <div className="form-textarea-footer">
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
              <span className="form-counter">
                {formData.description.length}/200
              </span>
            </div>
          </div>

          <div className="transfer-summary">
            <h3 className="transfer-summary__title">Resumen</h3>
            <div className="transfer-summary__row">
              <span>Destino:</span>
              <span>{formatAccountNumber(formData.recipientAccount) || '—'}</span>
            </div>
            <div className="transfer-summary__row">
              <span>Monto:</span>
              <span className="transfer-summary__amount">
                {formatCurrency(formData.amount)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={transferMutation.isPending}
          >
            {transferMutation.isPending ? 'Procesando...' : 'Continuar'}
          </button>
        </form>

        {showConfirm && (
          <div 
            ref={confirmationRef}
            className="transfer-confirm" 
            role="dialog"
            aria-labelledby="confirm-title"
          >
            <div className="transfer-confirm__content">
              <h2 id="confirm-title" className="transfer-confirm__title">
                Confirmar transferencia
              </h2>
              <div className="transfer-confirm__details">
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">Destino:</span>
                  <span className="transfer-confirm__value">
                    {formatAccountNumber(formData.recipientAccount)}
                  </span>
                </div>
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">Monto:</span>
                  <span className="transfer-confirm__value transfer-confirm__value--highlight">
                    {formatCurrency(formData.amount)}
                  </span>
                </div>
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">Descripción:</span>
                  <span className="transfer-confirm__value">
                    {formData.description}
                  </span>
                </div>
                <div className="transfer-confirm__row">
                  <span className="transfer-confirm__label">ID de operación:</span>
                  <span className="transfer-confirm__value transfer-confirm__value--mono">
                    {idempotencyKey}
                  </span>
                </div>
              </div>
              <p className="transfer-confirm__warning">
                ¿Estás seguro de realizar esta transferencia? Esta acción no se puede deshacer.
              </p>
              <div className="transfer-confirm__actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelConfirm}
                  disabled={transferMutation.isPending}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmTransfer}
                  disabled={transferMutation.isPending}
                >
                  {transferMutation.isPending ? 'Enviando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}