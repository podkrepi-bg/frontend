BEGIN TRANSACTION;


CREATE TABLE IF NOT EXISTS "campaign"."beneficiaries" (
    "id"					          uuid NOT NULL DEFAULT (gen_random_uuid()),
    "first_name"			      varchar(100) NOT NULL,
    "last_name"			        varchar(100) NOT NULL,
    "type"				          integer NOT NULL,
	  "organizer_id"		      uuid NOT NULL,
    "iso2country_code"	    integer NOT NULL,
    "city"				          integer NOT NULL,
    "email"				          character varying(100) NULL,
    "phone"				          character varying(50) NULL,
    "additional_details"	  jsonb NULL,

    CONSTRAINT "PK_Beneficiaries" PRIMARY KEY ("id"),
    CONSTRAINT "UC_Email" UNIQUE ("email")
);

COMMIT;
