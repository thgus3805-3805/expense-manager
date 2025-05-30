'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface Expense {
  id: number
  amount: number
  description: string
  category: string
  date: string
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses')
      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return (
      <div className="flex flex-col">
        <span>{format(d, 'yyyy', { locale: ko })}</span>
        <span>{format(d, 'MM/d', { locale: ko })}</span>
      </div>
    )
  }

  const shouldShowDate = (index: number, date: string) => {
    if (index === 0) return true
    const prevDate = new Date(expenses[index - 1].date).toDateString()
    const currentDate = new Date(date).toDateString()
    return prevDate !== currentDate
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p>아직 등록된 지출이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="expense-table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th className="expense-table-header w-14">날짜</th>
            <th className="expense-table-header w-20">카테고리</th>
            <th className="expense-table-header flex-1">설명</th>
            <th className="expense-table-header text-right w-28">금액</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map((expense, index) => (
            <tr
              key={expense.id}
              className="transition-colors hover:bg-blue-50/50"
            >
              <td className="expense-table-cell">
                {shouldShowDate(index, expense.date) ? formatDate(expense.date) : null}
              </td>
              <td className="expense-table-cell">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                  {expense.category}
                </span>
              </td>
              <td className="expense-table-cell-description">
                {expense.description}
              </td>
              <td className="expense-table-cell text-right font-medium">
                {formatAmount(expense.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 