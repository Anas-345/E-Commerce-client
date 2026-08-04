import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function PagesCards({icon, header, count, content}) {
    return <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {header}
            </CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count}</div>
            <p className="text-xs text-muted-foreground">
              {content}
            </p>
          </CardContent>
        </Card>
}