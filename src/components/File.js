import { Button, Upload } from "antd";

export function File() {
  return (
    <div style={{display: "flex", marginTop: 10, marginBottom: 20}}>
      <Upload>
        <Button>Upload Excel File</Button>
      </Upload>
    </div>
  )
}