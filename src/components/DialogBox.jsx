import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function DialogBox({
  header,
  content,
  state,
  setState,
  loader,
  handler,
  btnContent,
  variant = "destructive",
  titleVariant = "text-destructive",
}) {
  return (
    <Dialog open={!!state} onOpenChange={() => setState(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={titleVariant}>{header}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 pt-2">
          <Button
            variant="outline"
            disabled={loader}
            onClick={() => setState(null)}
          >
            Cancel
          </Button>
          <Button variant={variant} disabled={loader} onClick={handler}>
            {loader && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {btnContent}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
