-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "lastVisit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitor_logs" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_stats" (
    "id" TEXT NOT NULL DEFAULT 'site-stats',
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_views_ipHash_key" ON "page_views"("ipHash");

-- CreateIndex
CREATE INDEX "page_views_ipHash_idx" ON "page_views"("ipHash");

-- CreateIndex
CREATE INDEX "visitor_logs_ipAddress_idx" ON "visitor_logs"("ipAddress");

-- CreateIndex
CREATE INDEX "visitor_logs_visitedAt_idx" ON "visitor_logs"("visitedAt");
