"use client";

import "swagger-ui-react/swagger-ui.css";

import SwaggerUI from "swagger-ui-react";

export default function Page() {
  return <SwaggerUI url="/api/openapi.json" />;
}
