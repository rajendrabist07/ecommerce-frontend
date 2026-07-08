import { useState } from "react";
import Button from "../components/common/Button";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = new FormData(event.currentTarget).get("email");

    try {
      await forgotPassword(email);
      setMessage("Password reset email requested. Please check your inbox.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] px-4 py-10 dark:bg-[linear-gradient(180deg,#020617,#0f172a)]">
      <form className="glass-panel mx-auto mt-20 max-w-md rounded-[2rem] p-8" onSubmit={submit}>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Forgot password</h1>
        <label className="mt-6 block">
          <span className="mb-2 block text-sm font-bold">Email</span>
          <input className="input-field" name="email" required type="email" />
        </label>
        {message ? <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">{message}</p> : null}
        <Button className="mt-6 w-full" isLoading={loading} type="submit">
          Send reset link
        </Button>
      </form>
    </main>
  );
};

export default ForgotPassword;
