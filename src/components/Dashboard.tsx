import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const servers = [
    { 
      id: 'srv-001', 
      name: 'Web Server', 
      status: 'running', 
      cpu: 45, 
      memory: 68, 
      disk: 32,
      plan: 'Pro'
    },
    { 
      id: 'srv-002', 
      name: 'Database Server', 
      status: 'running', 
      cpu: 78, 
      memory: 89, 
      disk: 56,
      plan: 'Enterprise'
    },
    { 
      id: 'srv-003', 
      name: 'Test Server', 
      status: 'stopped', 
      cpu: 0, 
      memory: 0, 
      disk: 12,
      plan: 'Basic'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Панель управления</h1>
          <p className="text-muted-foreground">Управляйте вашими серверами</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Icon name="Plus" size={16} className="mr-2" />
          Создать сервер
        </Button>
      </div>

      <div className="grid gap-6">
        {servers.map((server, index) => (
          <Card 
            key={server.id} 
            className="border-0 shadow-lg animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    server.status === 'running' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h3 className="text-lg font-semibold">{server.name}</h3>
                    <p className="text-sm text-muted-foreground">{server.id} • {server.plan}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={server.status === 'running' ? 'default' : 'secondary'}>
                    {server.status === 'running' ? 'Работает' : 'Остановлен'}
                  </Badge>
                  <Switch 
                    checked={server.status === 'running'} 
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU</span>
                    <span>{server.cpu}%</span>
                  </div>
                  <Progress value={server.cpu} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Память</span>
                    <span>{server.memory}%</span>
                  </div>
                  <Progress value={server.memory} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Диск</span>
                    <span>{server.disk}%</span>
                  </div>
                  <Progress value={server.disk} className="h-2" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={14} className="mr-2" />
                  Настройки
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Terminal" size={14} className="mr-2" />
                  Консоль
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="BarChart3" size={14} className="mr-2" />
                  Статистика
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;