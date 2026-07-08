import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  email: z.string().email("Valid email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
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
      await signIn(result.data);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] px-4 py-10 dark:bg-[linear-gradient(180deg,#020617,#0f172a)]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">
        <div className="hidden lg:block">
          <h1 className="max-w-xl text-6xl font-black leading-tight text-slate-950 dark:text-white">Welcome back to Rajendra Store.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-300">
            Sign in to manage orders, wishlist, checkout, and admin workflows.
          </p>
        </div>

        <form className="glass-panel rounded-[2rem] p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
          <Link className="mb-8 inline-flex font-bold text-slate-950 dark:text-white" to="/">
            Rajendra Store
          </Link>
          <h2 className="text-3xl font-black text-slate-950 dark:text-white">Login</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Access your account securely.</p>

          {serverError ? <p className="mt-5 rounded-2xl bg-rose-500/10 p-3 text-sm font-semibold text-rose-600">{serverError}</p> : null}

          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</span>
            <input className="input-field" type="email" {...register("email")} />
            {errors.email ? <span className="mt-2 block text-sm text-rose-600">{errors.email.message}</span> : null}
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password</span>
            <input className="input-field" type="password" {...register("password")} />
            {errors.password ? <span className="mt-2 block text-sm text-rose-600">{errors.password.message}</span> : null}
          </label>

          <div className="mt-4 text-right">
            <Link className="text-sm font-bold text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <Button className="mt-6 w-full" isLoading={isSubmitting} type="submit">
            Login
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            New here?{" "}
            <Link className="font-bold text-slate-950 dark:text-white" to="/register">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
