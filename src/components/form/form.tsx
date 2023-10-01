import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";

type Props<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  schema?: Schema;
  defaultValue?: DefaultValues<TFormValues> | undefined
};

export const Form = <
  TFormValues extends FieldValues,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>,
>(
  props: Props<TFormValues, Schema>,
) => {
  const { children, className,defaultValue, onSubmit, schema } = props;
  const methods = useForm<TFormValues>({
    resolver: schema && zodResolver(schema),
    defaultValues: defaultValue
  });

  return (
    <FormProvider {...methods} >
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
