import React from "react";
import { Button } from "./ui/button";
import { stepsStore } from "@/store/survey";
import { useStoreValue } from "@simplestack/store/react";
import { Loader2 } from "lucide-react";

export default function NavigationButtons({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  console.log(isLoading);
  const currentStep = useStoreValue(stepsStore);
  const nextTitle =
    currentStep == 1 ? "Get Started" : currentStep == 7 ? "Submit" : "Next";

  // const prevTitle =
  //   currentStep == 1 ? "Get Started" : currentStep == 7 ? "Submit" : "Next";
  return (
    <div className="py-3 flex justify-between items-center">
      {currentStep > 1 && (
        <Button
          className="shadow-none"
          type="button"
          size={"lg"}
          onClick={() => stepsStore.set((c) => c - 1)}
          variant={"light-pill"}
        >
          Previous
        </Button>
      )}
      <Button
        className="shadow-none"
        type="submit"
        size={"lg"}
        disabled={isLoading}
        variant={"gradient"}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {isLoading ? "Submitting..." : nextTitle}
      </Button>
    </div>
  );
}
