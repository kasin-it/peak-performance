create table "public"."profiles" (
    "id" uuid not null,
    "username" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profile_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
  BEGIN
    INSERT INTO public.profiles (id)
    VALUES (NEW.id);
    RETURN NEW;
  END;
  $function$
;

create policy "Can only update own profile data."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));



