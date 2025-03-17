import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ApiHtmlGenerator() {
  const [url, setUrl] = useState("");
  const [apiData, setApiData] = useState(null);
  const [htmlOutput, setHtmlOutput] = useState("");
  
  const fetchApi = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setApiData(data);
      generateHtml(data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const generateHtml = (data) => {
    let html = "<div class='api-container'>";
    for (const key in data) {
      html += `<p><strong>${key}:</strong> ${JSON.stringify(data[key])}</p>`;
    }
    html += "</div>";
    setHtmlOutput(html);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    alert("HTML copied to clipboard!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">HTML API Generator</h1>
      <Input
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-2"
      />
      <Button onClick={fetchApi}>Fetch API</Button>

      {apiData && (
        <Card className="mt-4">
          <CardContent>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(apiData, null, 2)}</pre>
          </CardContent>
        </Card>
      )}

      {htmlOutput && (
        <Card className="mt-4">
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
            <Button onClick={copyToClipboard} className="mt-2">Copy HTML</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
