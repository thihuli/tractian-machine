import useFetch from '../../Hooks/useFetch';
import { Company, User, Unit } from '../../Models/User';
import { Card, Avatar, Spin, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.css'
import { useState, useEffect } from 'react';

export function Users() {
  const [company, setCompany] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error } = useFetch<User[]>(`https://my-json-server.typicode.com/tractian/fake-api/users`);
  const { data: dataCompany, error: errorCompany } = company ? useFetch<Company>(`https://my-json-server.typicode.com/tractian/fake-api/companies/${company}`) : useFetch<Company>('');
  const { data: unit, error: errorUnits } = company ? useFetch<Unit>(`https://my-json-server.typicode.com/tractian/fake-api/units/${company}`) : useFetch<Unit>('');
  
  const moreInformation = (companyId: number) => {
    setCompany(companyId)
    setIsModalOpen(true)
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  if (!data) return <div className='container-load'>
    <Spin tip="Carregando informações..." style={{ fontSize: 35 }}/>
  </div>

  return (
    <div className='container-users'>
      <Modal title="Dados Adicionais" open={isModalOpen} onOk={onCancel} onCancel={onCancel} >
        <p>Empresa: {dataCompany?.name}</p>
        <p>Unidade: {unit?.name}</p>
      </Modal>
      {
        data?.map(user => (
          <Card className='card-users' key={user.id} >
            <Avatar size={64} icon={<UserOutlined />} className="avatar" />
            <div className='information-user'>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
            <button onClick={() => moreInformation(user.companyId)} className='more-information'>Ver empresa</button>
          </Card>
        ))
      }
    </div>
  );
}