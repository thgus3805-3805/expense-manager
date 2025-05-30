import ExpenseList from '@/components/ExpenseList'
import ExpenseForm from '@/components/ExpenseForm'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="card">
            <div className="p-6">
              <ExpenseForm />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-medium">지출 내역</h2>
            </div>
            <div className="p-6">
              <ExpenseList />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
