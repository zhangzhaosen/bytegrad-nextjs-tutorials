'use client'
import { useState } from "react";

export default function FormWithoutReactHookForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    if (password != confirmPassword) {
      setErrors(['密码不一致'])
      setIsSubmitting(false)
      return
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors([])
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
      <ul>
        {errors.map((error, index) => (
          <li key={index} className="text-red-500">
            {error}
          </li>
        ))}
      </ul>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded"
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="px-4 py-2 rounded"
      />

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}