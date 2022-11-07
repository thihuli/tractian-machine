import { ReactElement, useState } from 'react';
import useFetch from "../../Hooks/useFetch"
import { Select, Card, Spin } from 'antd';
import { AlertOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Assets } from "../../Models/Assets"
import { formatDate, getHours } from '../../Utils/index';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css'
import highchartsMore from 'highcharts/highcharts-more'
import solidGauge from 'highcharts/modules/solid-gauge'
import { optionsSelect } from './optionsConfig/optionsMachine';
import { optionTemperature } from './optionsConfig/optionTemperature';
import { optionHealthscore } from './optionsConfig/optionHealthscore';
import { optionsRpm } from './optionsConfig/optionsRpm';

interface StatusMachines {
  [key: string]: {
    text: string
    icon: ReactElement
  }
}

highchartsMore(Highcharts)
solidGauge(Highcharts)

export function Monitor() {
  const [machine, setMachine] = useState(1)
  const { data, error } = useFetch<Assets>(`https://my-json-server.typicode.com/tractian/fake-api/assets/${machine}`)

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    setMachine(Number(value.value))
  };

  const statusMachines: StatusMachines = {
    inAlert: {
      text: 'Em Alerta',
      icon: <AlertOutlined style={{ color: '#F4B04E' }} className='icon-status' />
    },
    inOperation: {
      text: 'Em Operação',
      icon: <CheckCircleOutlined style={{ color: '#75E81C' }} className='icon-status' />
    },
    inDowntime: {
      text: 'Em Parada',
      icon: <StopOutlined style={{ color: '#EE1103' }} className='icon-status' />
    }
  }

  if (!data) return <div className='container-load'>
    <Spin tip="Carregando informações..." style={{ fontSize: 35 }}/>
  </div>

  return (
    <div className="Continer">
      <h1>Monitoramento de equipamentos</h1>

      <p className="title">Selecione o Motor que deseja monitorar os dados</p>
      <Select
        labelInValue
        defaultValue={optionsSelect[machine]}
        style={{ width: 160 }}
        onChange={handleChange}
        options={optionsSelect}
      />
      <div className="section-information">
        <Card
          className='card-information'
          cover={
            <img className="image-machine"
              alt='machibe'
              src={data.image}
              style={{ height: '260px', objectFit: 'contain' }}
            />}
        >
          <Card.Meta title={data.name} description={`Modelo ${data.model.toUpperCase()}`} />
        </Card>

        <Card className='card-information'>
          <h4>Parâmetros do motor</h4>
          <div className="card-container">
            <div className='status-container'>
              <p>Status: {statusMachines[data.status].text}</p>
              {statusMachines[data.status].icon}
            </div>
            <p>Sensor: {data.sensors[0]}</p>
            <p>Total de Coletas: {data.metrics.totalCollectsUptime}</p>
            <p>Total de Horas Coletadas: {getHours(data.metrics.totalUptime)} </p>
            <p>Data da ultima coleta: {formatDate(data.metrics.lastUptimeAt)}</p>
          </div>
        </Card>
        <Card className='card-information'>
          <HighchartsReact highcharts={Highcharts} options={optionHealthscore(data.healthscore)} />
        </Card>
        <Card className='card-information'>
          <HighchartsReact highcharts={Highcharts} options={optionTemperature(data.specifications.maxTemp)} />
        </Card>
        <Card className='card-information'>
          <HighchartsReact highcharts={Highcharts} options={optionsRpm(data.specifications.rpm)} />
        </Card>
      </div>
    </div>
  )
}