import Spinner from "@/components/utils/spinner";

export default function LoadingSpinner() {
  return (
    <>
      <Spinner />
      <span className="sr-only">Loading...</span>
    </>
  );
}
