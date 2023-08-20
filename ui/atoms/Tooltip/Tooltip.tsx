import * as RadixUITooltip from "@radix-ui/react-tooltip";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <RadixUITooltip.Provider>
      <RadixUITooltip.Root>
        <RadixUITooltip.Trigger>{children}</RadixUITooltip.Trigger>
        <RadixUITooltip.Portal>
          <RadixUITooltip.Content
            sideOffset={10}
            className="rounded-small border border-main-orange bg-white p-2 shadow-regular"
          >
            {content}
          </RadixUITooltip.Content>
        </RadixUITooltip.Portal>
      </RadixUITooltip.Root>
    </RadixUITooltip.Provider>
  );
};
