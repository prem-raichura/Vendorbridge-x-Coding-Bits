-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_no" TEXT,
    "country" TEXT,
    "avatar" JSONB,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),
    "role" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Rfq" (
    "rfq_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rfq_title" TEXT,
    "rfq_category" TEXT,
    "rfq_deadline" TIMESTAMP(3),
    "rfq_description" TEXT,
    "attachment" JSONB,
    "items" JSONB,
    "assign_vendors" JSONB,
    "rfq_status" TEXT,
    "flag" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rfq_pkey" PRIMARY KEY ("rfq_id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "q_id" SERIAL NOT NULL,
    "rfq_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "item" JSONB,
    "gst_tax" INTEGER,
    "discount" INTEGER,
    "note" TEXT,
    "sub_amount" DOUBLE PRECISION,
    "total_amount" DOUBLE PRECISION,
    "flag" BOOLEAN,
    "payment_terms" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "delivery_date" TIMESTAMP(3),
    "quotation_status" BOOLEAN,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("q_id")
);

-- CreateTable
CREATE TABLE "VendorDetails" (
    "vendor_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "organisation_name" TEXT,
    "gst_id" TEXT,
    "address" TEXT,
    "status" TEXT,

    CONSTRAINT "VendorDetails_pkey" PRIMARY KEY ("vendor_id")
);

-- CreateTable
CREATE TABLE "Approval" (
    "app_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "q_id" INTEGER NOT NULL,
    "approve_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Approval_pkey" PRIMARY KEY ("app_id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "po_id" SERIAL NOT NULL,
    "q_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "po_num" TEXT,
    "po_status" BOOLEAN,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("po_id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "inv_id" SERIAL NOT NULL,
    "po_id" INTEGER NOT NULL,
    "inv_no" TEXT,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("inv_id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "log_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "action" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Rfq" ADD CONSTRAINT "Rfq_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "Rfq"("rfq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "VendorDetails"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorDetails" ADD CONSTRAINT "VendorDetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_q_id_fkey" FOREIGN KEY ("q_id") REFERENCES "Quotation"("q_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_q_id_fkey" FOREIGN KEY ("q_id") REFERENCES "Quotation"("q_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "PurchaseOrder"("po_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
