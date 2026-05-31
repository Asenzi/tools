'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function CronGenerator() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const [copied, setCopied] = useState(false);

  const cronExpression = `${minute} ${hour} ${day} ${month} ${weekday}`;

  const handleCopy = async () => {
    await copyToClipboard(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDescription = () => {
    if (cronExpression === '* * * * *') return 'Every minute';
    if (cronExpression === '0 * * * *') return 'Every hour';
    if (cronExpression === '0 0 * * *') return 'Every day at midnight';
    if (cronExpression === '0 0 * * 0') return 'Every Sunday at midnight';
    return 'Custom schedule';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cron Expression Builder</CardTitle>
          <CardDescription>Build cron expressions using simple inputs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Minute</label>
              <Input
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <span className="text-xs text-muted-foreground">0-59</span>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Hour</label>
              <Input
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <span className="text-xs text-muted-foreground">0-23</span>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Day</label>
              <Input
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <span className="text-xs text-muted-foreground">1-31</span>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Month</label>
              <Input
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <span className="text-xs text-muted-foreground">1-12</span>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Weekday</label>
              <Input
                value={weekday}
                onChange={(e) => setWeekday(e.target.value)}
                placeholder="*"
                className="font-mono"
              />
              <span className="text-xs text-muted-foreground">0-6</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Quick Presets</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => { setMinute('*'); setHour('*'); setDay('*'); setMonth('*'); setWeekday('*'); }}>
                Every minute
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setMinute('0'); setHour('*'); setDay('*'); setMonth('*'); setWeekday('*'); }}>
                Every hour
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setMinute('0'); setHour('0'); setDay('*'); setMonth('*'); setWeekday('*'); }}>
                Daily at midnight
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setMinute('0'); setHour('0'); setDay('*'); setMonth('*'); setWeekday('1'); }}>
                Every Monday
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Expression</CardTitle>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-md font-mono text-lg font-bold">
            {cronExpression}
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {getDescription()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
