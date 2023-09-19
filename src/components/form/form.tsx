import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";

type Props<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  schema?: Schema;
};

export const Form = <
  TFormValues extends FieldValues,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>,
>(
  props: Props<TFormValues, Schema>,
) => {
  const { children, className, onSubmit, schema } = props;
  const methods = useForm<TFormValues>({
    resolver: schema && zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
