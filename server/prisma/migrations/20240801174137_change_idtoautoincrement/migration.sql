-- AlterTable
CREATE SEQUENCE company_id_seq;
ALTER TABLE "company" ALTER COLUMN "id" SET DEFAULT nextval('company_id_seq');
ALTER SEQUENCE company_id_seq OWNED BY "company"."id";

-- AlterTable
CREATE SEQUENCE user_account_id_seq;
ALTER TABLE "user_account" ALTER COLUMN "id" SET DEFAULT nextval('user_account_id_seq');
ALTER SEQUENCE user_account_id_seq OWNED BY "user_account"."id";
