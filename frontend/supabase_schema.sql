-- Supabase Native Auth - SaaS Token Table Setup
-- Run this script in your Supabase SQL Editor

-- 1. Create the token_balances table in the public schema
CREATE TABLE IF NOT EXISTS public.token_balances (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL UNIQUE,
  balance integer NOT NULL DEFAULT 5,
  last_refill_date timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  CONSTRAINT fk_auth_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. Enable Row Level Security (RLS) so users can only read their own balance
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own token balance" 
ON public.token_balances 
FOR SELECT 
USING (auth.uid() = user_id);

-- 3. Create a trigger to automatically give new users 5 tokens when they sign up
CREATE OR REPLACE FUNCTION public.create_token_balance()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.token_balances (user_id, balance, last_refill_date)
  VALUES (new.id, 5, now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.create_token_balance();
