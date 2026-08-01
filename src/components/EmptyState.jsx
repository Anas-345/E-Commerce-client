import { Card, CardContent, CardTitle } from "./ui/card";

export default function EmptyState({ Icon, content }) {
  return (
    <Card className="py-12 text-center">
      <CardContent className="space-y-3">
            <Icon className="h-10 w-10 text-muted-foreground mx-auto" />
        <CardTitle>No {content} found</CardTitle>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search terms or filters.
        </p>
      </CardContent>
    </Card>
  );
}
