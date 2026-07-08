import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

const schema = z
  .object({
    confirmPassword: z.string().min(6, "Confirm your password."),
    email: z.string().email("Valid email is required."),
    name: z.string().min(2, "Name is required."),
    password: z.string().min(6, "Password must be at least 6 characters."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [serverError, setServerError] = useState("");
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm();

  const onSubmit = async (values) => {
    setServerError("");
    const result = schema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => setError(issue.path[0], { message: issue.message }));
      return;
    }

    try {
      const payload = { ...result.data };
      delete payload.confirmPassword;
      await signUp(payload);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] px-4 py-10 dark:bg-[linear-gradient(180deg,#020617,#0f172a)]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_460px]">
        <div className="hidden lg:block">
          <h1 className="max-w-xl text-6xl font-black leading-tight text-slate-950 dark:text-white">Create a faster shopping identity.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-300">
            Save wishlist items, checkout faster, and track every order from one account.
          </p>
        </div>

        <form className="glass-panel rounded-[2rem] p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
          <Link className="mb-8 inline-flex font-bold text-slate-950 dark:text-white" to="/">
            Rajendra Store
          </Link>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">Register</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Create your secure customer account.</p>

          {serverError ? <p className="mt-5 rounded-2xl bg-rose-500/10 p-3 text-sm font-semibold text-rose-600">{serverError}</p> : null}

          {[
            { label: "Full name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm password", name: "confirmPassword", type: "password" },
          ].map((field) => (
            <label className="mt-4 block" key={field.name}>
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">{field.label}</span>
              <input className="input-field" type={field.type} {...register(field.name)} />
              {errors[field.name] ? <span className="mt-2 block text-sm text-rose-600">{errors[field.name].message}</span> : null}
            </label>
          ))}

          <Button className="mt-6 w-full" isLoading={isSubmitting} type="submit">
            Create account
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Already have an account?{" "}
            <Link className="font-bold text-slate-950 dark:text-white" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
