import React, { useEffect, useState } from 'react'
import { useIrisElements } from './irisContextHooks'
import { BankList } from './IRISPayComponent'

interface BankListElementProps {
  selectedBank?: string | null
  onBankSelect?: (bankHash: string) => void
}

export default function BankListElement({ selectedBank, onBankSelect }: BankListElementProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [banks, setBanks] = useState<BankList[]>()
  const context = useIrisElements()

  useEffect(() => {
    async function loadBanks() {
      try {
        const apiUrl = `/api/iris-pay/banks/${context.publicHash}?backend=${context.backend}`

        const response = await fetch(apiUrl, {
          headers: { accept: 'application/json', 'content-type': 'application/json' },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = (await response.json()) as BankList[]
        const list = data.filter((bank) => bank.country === context.country)
        setBanks(list)
      } catch (err) {
        console.error(`Failed to fetch ${(err as any).message}`)
      } finally {
        setIsLoading(false)
      }
    }
    loadBanks()
  }, [context.country])

  const handleBankSelect = (bankHash: string) => {
    onBankSelect?.(bankHash)
  }

  // Skeleton loader component
  const SkeletonCard = () => (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        animation: 'pulse 1.5s ease-in-out infinite alternate',
      }}>
      <div
        style={{
          height: '20px',
          backgroundColor: '#d0d0d0',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      />
      <div
        style={{
          height: '14px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '8px',
          width: '70%',
        }}
      />
      <div
        style={{
          height: '12px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          width: '50%',
        }}
      />
    </div>
  )

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            100% { opacity: 0.5; }
          }
        `}</style>
        <h3 style={{ marginBottom: '16px', color: '#333' }}>Loading Banks...</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            maxWidth: '100%',
          }}>
          {Array.from({ length: 6 }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (!banks || banks.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '16px' }}>No banks available for your country.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '16px', color: '#333', fontSize: '20px' }}>
        Select a Bank ({banks.length} available)
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          maxWidth: '100%',
        }}>
        {banks.map((bank) => (
          <div
            key={bank.bankHash}
            onClick={() => handleBankSelect(bank.bankHash)}
            style={{
              border: `2px solid ${selectedBank === bank.bankHash ? '#007bff' : '#e0e0e0'}`,
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: selectedBank === bank.bankHash ? '#f0f8ff' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow:
                selectedBank === bank.bankHash
                  ? '0 4px 12px rgba(0, 123, 255, 0.3)'
                  : '0 2px 4px rgba(0, 0, 0, 0.1)',
              //@ts-expect-error
              ':hover': {
                borderColor: '#007bff',
                transform: 'translateY(-2px)',
              },
            }}
            onMouseEnter={(e) => {
              if (selectedBank !== bank.bankHash) {
                e.currentTarget.style.borderColor = '#007bff'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedBank !== bank.bankHash) {
                e.currentTarget.style.borderColor = '#e0e0e0'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
              }
            }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}>
              <h4
                style={{
                  margin: '0',
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: '600',
                }}>
                {bank.name}
              </h4>
              {selectedBank === bank.bankHash && (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}>
                  ✓
                </div>
              )}
            </div>

            <p
              style={{
                margin: '0 0 8px 0',
                color: '#666',
                fontSize: '14px',
                lineHeight: '1.4',
              }}>
              {bank.fullName}
            </p>

            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#888' }}>
              <span>
                <strong>BIC:</strong> {bank.bic}
              </span>
              <span>
                <strong>Services:</strong> {bank.services}
              </span>
            </div>

            <div
              style={{
                marginTop: '8px',
                fontSize: '11px',
                color: '#999',
                textTransform: 'capitalize',
              }}>
              Country: {bank.country}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
