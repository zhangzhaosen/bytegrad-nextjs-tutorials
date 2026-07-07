'use client'
import { useState } from "react";
import { FieldValues, useForm } from 'react-hook-form'
export default function FormWithReactHookForm() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm()

  async function onSubmit(data: FieldValues){

    await new Promise(resolve=>setTimeout(resolve, 1000) )
    reset()
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">


      <input
        {...register('email', {
          required: true,
          minLength: {
            value: 5,
            message: 'Email must be at least 5 characters long'

          }
        })}
        type="email"
        placeholder="Email"

        className="px-4 py-2 rounded"
      />
      {
        errors.email && (
          ///@ts-ignore
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )
      }

      <input
        {...register('password', { required: true ,
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long'
          }
        })}
        type="password"
        placeholder="Password"

        className="px-4 py-2 rounded"
      />
      {
        errors.password && (
           ///@ts-ignore
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )
      }

      <input
        {...register('confirmPassword', { required: true ,
          validate: (value: string) => value === getValues('password') || 'Passwords do not match'
        })}
        type="password"
        placeholder="Confirm password"

        className="px-4 py-2 rounded"
      />
      {
        errors.confirmPassword && (
           ///@ts-ignore
          <p className="text-red-500 text-sm">{errors?.confirmPassword?.message}</p>
        )
      }

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