import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Select, Form, Table, Popconfirm } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Componetnts/Sidebar';

const { Option } = Select;

const ItemsPage = () => {
  const [formData, setFormData] = useState({ name: '', category: '', price: '' });
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const handleChange = (value, key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/menu');
      setItems(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.category || !formData.price) {
        toast.error('Please fill all fields');
        return;
      }

      if (editingItemId) {
        // Update existing item
        await axios.put(`http://localhost:8080/api/menu/${editingItemId}`, {
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
        });
        toast.success('Item updated successfully!');
        setEditingItemId(null);
      } else {
        // Add new item
        await axios.post('http://localhost:8080/api/menu', {
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
        });
        toast.success('Item added successfully!');
      }

      setFormData({ name: '', category: '', price: '' });
      fetchItems();
    } catch (error) {
      console.error(error);
      toast.error('Operation failed');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
    });
    setEditingItemId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/menu/${id}`);
      toast.success('Item deleted');
      fetchItems();
    } catch (error) {
      console.error(error);
      toast.error('Delete failed');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price (Rs)', dataIndex: 'price', key: 'price' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Toaster />
      <Sidebar/>
      <h2 className="text-2xl font-bold mb-4">
        {editingItemId ? 'Update Item' : 'Add New Menu Item'}
      </h2>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Item Name">
          <Input
            value={formData.name}
            onChange={(e) => handleChange(e.target.value, 'name')}
            placeholder="e.g., Chicken Biryani"
          />
        </Form.Item>

        <Form.Item label="Category">
          <Select
            value={formData.category}
            onChange={(value) => handleChange(value, 'category')}
            placeholder="Select category"
          >
            <Option value="rice">Rice</Option>
            <Option value="tea">Tea</Option>
            <Option value="snacks">Snacks</Option>
            <Option value="drinks">Drinks</Option>
            <Option value="BBQ">BBQ</Option>
            <Option value="soup">Soup</Option>
            <Option value="sweetBar">Sweets</Option>
            <Option value="chowmein">Chowmein</Option>
            <Option value="hotBar">Hot Drinks</Option>
            <Option value="handi">Handi</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Price (Rs)">
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange(e.target.value, 'price')}
            placeholder="e.g., 250"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="mt-2 w-full">
          {editingItemId ? 'Update Item' : 'Add Item'}
        </Button>
      </Form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Menu Items</h3>
      <Table
        dataSource={items}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ItemsPage;
