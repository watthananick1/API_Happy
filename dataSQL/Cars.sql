CREATE TABLE IF NOT EXISTS public."Cars"
(
    car_id integer NOT NULL DEFAULT nextval('"Cars_car_id_seq"'::regclass),
    car_brand text COLLATE pg_catalog."default" NOT NULL,
    car_size text COLLATE pg_catalog."default" NOT NULL,
    car_price integer NOT NULL,
    car_style text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Cars_pkey" PRIMARY KEY (car_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Cars"
    OWNER to postgres;
    
    
CREATE TABLE IF NOT EXISTS public."Orders"
(
    o_id integer NOT NULL DEFAULT nextval('"Orders_o_id_seq"'::regclass),
    user_id integer NOT NULL,
    car_id integer NOT NULL,
    order_total integer NOT NULL,
    o_date date NOT NULL,
    o_status text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Orders_pkey" PRIMARY KEY (o_id),
    CONSTRAINT user_forkey FOREIGN KEY (user_id)
        REFERENCES public."Users" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Orders"
    OWNER to postgres;
    
CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id integer NOT NULL DEFAULT nextval('"Users_user_id_seq"'::regclass),
    user_fname text COLLATE pg_catalog."default" NOT NULL,
    user_lname text COLLATE pg_catalog."default" NOT NULL,
    user_address text COLLATE pg_catalog."default" NOT NULL,
    user_email text COLLATE pg_catalog."default" NOT NULL,
    user_phone text COLLATE pg_catalog."default" NOT NULL,
    user_password text COLLATE pg_catalog."default" NOT NULL,
    user_status text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;