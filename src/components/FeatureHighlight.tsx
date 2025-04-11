
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ icon, title, description }) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureHighlight;
