import { Table, Button, Form, DatePicker } from "antd"
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react"

export function DataEntry(props) {
  const [emissionData, setEmissionData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm()

  // fetch emission data by source from the backend
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/emission?emission_source=${props.source}`)
      .then((res) => res.json())
      .then((data) => { setEmissionData(data.data)}) // set frontend data as backend data
      .catch((err) => { console.log(err)})
  }, [props]);

  const data = emissionData.map((item, key) =>  { return {"key" : key, ...item} });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text,record)=>{
        if (editingRow === record.key){
          return(
          <Form.Item name="date" rules={[{ required:true, message:"Please choose date"}]}>
            <DatePicker dateFormat="MM-YYYY"/>
          </Form.Item>)
        } else {
          return <p>{text}</p>
        }
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text,record)=>{
        if (editingRow === record.key){
          return(
          <Form.Item name="amount" rules={[{ required:true, message:"Please enter amount"}]}>
            <Input defaultValue={text}/>
          </Form.Item>)
        } else {
          return <p>{text}</p>
        }
      }
    },
    {
      title: "Carbon Emission",
      dataIndex: "carbon_emission",
      
      sorter: (a,b) => a.carbon_emission - b.carbon_emission
    },
    {
      title: "Actions",
      render:(_,record)=>{
        return <>
          <Button type="link" onClick={()=>{
            setEditingRow(record.key);
            form.setFieldsValue({
                amount:record.amount
              })
            }}
          >Edit</Button>
          <Button type="link" htmlType="submit">Save</Button>
        </>
      }
    }
  ]

  const onFinish = (values) => {
    const month = values.date.$M + 1 
    const year = values.date.$y
    const date = month.toString() + '-' + year.toString()
    const amount = parseFloat(values.amount);

    data.forEach(record => {
        if (record['key'] === editingRow) {
          record['date'] = date
          record['amount'] = amount
        }
    })

    const record = data[editingRow];
    record['emission_source'] = props.source;
    delete record['carbon_emission'];
    console.log(record);
    // const updatedEmissionData = [...emissionData]
    // updatedEmissionData.splice(editingRow,1,{...values, key: editingRow});
    // console.log(updatedEmissionData);
    // setEmissionData(updatedEmissionData);
    // setEditingRow(null)

    fetch('http://127.0.0.1:5000/api/emission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    })
      .then(data => data.json())

    // navigate(`/data_entry/${props.source}`)
    window.location.reload(true);
    }

  const onAddRecord = () => {
    const newEmissionData = {
      date: [new Date().getMonth() + 1, new Date().getFullYear()].join('-'),
      amount: 0,
      carbon_emission: 0
    }

    setEmissionData(pre => {
      return [...pre, newEmissionData]
    })
  }
  
  return (<div>
    <h3>Data Entry for {props.source.charAt(0).toUpperCase() + props.source.slice(1)}</h3>
    <header>
      <Form form={form} onFinish={onFinish}>
        <Table dataSource={data} columns={columns}></Table>
      </Form>
      <Button onClick={onAddRecord}>Add New Record</Button>
    </header>
  </div>)
}