'use client'

import { useState } from 'react'

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add expense')
      }

      // Reset form
      setFormData({
        amount: '',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      })

      // Trigger page refresh
      window.location.reload()
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-500">
          금액
        </label>
        <input
          className="input-field"
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-500">
          카테고리
        </label>
        <select
          className="input-field"
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">선택하세요</option>
          <option value="식비">식비</option>
          <option value="교통비">교통비</option>
          <option value="주거비">주거비</option>
          <option value="의류비">의류비</option>
          <option value="의료비">의료비</option>
          <option value="문화생활">문화생활</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor="date" className="block text-sm font-medium text-gray-500">
          날짜
        </label>
        <input
          className="input-field"
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-medium text-gray-500">
          설명 (선택사항)
        </label>
        <input
          className="input-field"
          id="description"
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
      >
        지출 추가
      </button>
    </form>
  )
} 