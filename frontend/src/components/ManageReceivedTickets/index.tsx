import { Group, ScrollArea, Select, Table, TextInput } from '@mantine/core';
import { IconSearch } from "@tabler/icons-react";


const elements = [
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },
  { status: 'New', id: '#TKS0003', date: '23/08/31', timer: '00:30 HOUR AGO', type: 'Customer', category: 'Order Issue' },

];
export function ReceivedTicketsTable() {

  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.status}</td>
      <td>{element.id}</td>
      <td>{element.date}</td>
      <td>{element.timer}</td>
      <td>{element.type}</td>
      <td>{element.category}</td>

    </tr>
  ));

  return (

    <div style={{ border: "2px solid black", width: "100%", height: "60vh", padding: "10px", marginTop: '100px' }}>
      <Group spacing={"md"}>
        <TextInput
          radius={20}
          icon={<IconSearch size={15} />}
          placeholder="Search..."
          size="xs"
          style={{
            width: '300px', // Increase length
            padding: '10px', // Add margin to the bottom
          }}
        />
        <Select
          data={[
            { label: "Customer", value: "Customer" },
            {
              label: "SUPPLIER",
              value: "SUPPLIER",
            },
            { label: "ARTISAN", value: "ARTISAN" },
          ]}
          searchable
          dropdownPosition="bottom"
          size="xs"
          placeholder="STAKEHOLDER TYPE"
        />

        <Select
          data={[
            { label: "NEW", value: "NEW" },
            {
              label: "OLD",
              value: "OLD",
            },
          ]}
          searchable
          dropdownPosition="bottom"
          size="xs"
          placeholder="TICKET STATUS"
        />

        <Select
          data={[
            
          ]}
          searchable
          dropdownPosition="bottom"
          size="xs"
          placeholder="Raised Date"
        />
      </Group>
      <ScrollArea h={350}>
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead>
            <tr>
              <th>TICKET STATUS</th>
              <th>TICKET ID</th>
              <th>DATE</th>
              <th>TIMER</th>
              <th>STAKEHOLDER TYPE</th>
              <th>CATEGORY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}