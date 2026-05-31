'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const httpStatuses = [
  // 1xx Informational
  { code: 100, message: 'Continue', description: 'The server has received the request headers and the client should proceed to send the request body.' },
  { code: 101, message: 'Switching Protocols', description: 'The requester has asked the server to switch protocols and the server has agreed to do so.' },
  { code: 102, message: 'Processing', description: 'The server has received and is processing the request, but no response is available yet.' },

  // 2xx Success
  { code: 200, message: 'OK', description: 'The request has succeeded.' },
  { code: 201, message: 'Created', description: 'The request has been fulfilled and resulted in a new resource being created.' },
  { code: 202, message: 'Accepted', description: 'The request has been accepted for processing, but the processing has not been completed.' },
  { code: 204, message: 'No Content', description: 'The server successfully processed the request and is not returning any content.' },

  // 3xx Redirection
  { code: 301, message: 'Moved Permanently', description: 'The requested resource has been assigned a new permanent URI.' },
  { code: 302, message: 'Found', description: 'The requested resource resides temporarily under a different URI.' },
  { code: 304, message: 'Not Modified', description: 'The resource has not been modified since the last request.' },
  { code: 307, message: 'Temporary Redirect', description: 'The request should be repeated with another URI but future requests should still use the original URI.' },
  { code: 308, message: 'Permanent Redirect', description: 'The request and all future requests should be repeated using another URI.' },

  // 4xx Client Errors
  { code: 400, message: 'Bad Request', description: 'The server cannot process the request due to a client error.' },
  { code: 401, message: 'Unauthorized', description: 'Authentication is required and has failed or has not been provided.' },
  { code: 403, message: 'Forbidden', description: 'The server understood the request but refuses to authorize it.' },
  { code: 404, message: 'Not Found', description: 'The requested resource could not be found.' },
  { code: 405, message: 'Method Not Allowed', description: 'The request method is not supported for the requested resource.' },
  { code: 408, message: 'Request Timeout', description: 'The server timed out waiting for the request.' },
  { code: 409, message: 'Conflict', description: 'The request could not be completed due to a conflict with the current state of the resource.' },
  { code: 410, message: 'Gone', description: 'The requested resource is no longer available and will not be available again.' },
  { code: 429, message: 'Too Many Requests', description: 'The user has sent too many requests in a given amount of time.' },

  // 5xx Server Errors
  { code: 500, message: 'Internal Server Error', description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' },
  { code: 501, message: 'Not Implemented', description: 'The server does not support the functionality required to fulfill the request.' },
  { code: 502, message: 'Bad Gateway', description: 'The server received an invalid response from an upstream server.' },
  { code: 503, message: 'Service Unavailable', description: 'The server is currently unable to handle the request due to temporary overload or maintenance.' },
  { code: 504, message: 'Gateway Timeout', description: 'The server did not receive a timely response from an upstream server.' },
];

export function HttpStatusLookup() {
  const [search, setSearch] = useState('');
  const [filteredStatuses, setFilteredStatuses] = useState(httpStatuses);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (!value) {
      setFilteredStatuses(httpStatuses);
      return;
    }

    const filtered = httpStatuses.filter(
      (status) =>
        status.code.toString().includes(value) ||
        status.message.toLowerCase().includes(value.toLowerCase()) ||
        status.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStatuses(filtered);
  };

  const getStatusColor = (code: number) => {
    if (code < 200) return 'bg-blue-500/10 text-blue-500 border-blue-500';
    if (code < 300) return 'bg-green-500/10 text-green-500 border-green-500';
    if (code < 400) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500';
    if (code < 500) return 'bg-orange-500/10 text-orange-500 border-orange-500';
    return 'bg-red-500/10 text-red-500 border-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search HTTP Status Codes</CardTitle>
          <CardDescription>Search by code, message, or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search status codes..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredStatuses.map((status) => (
          <Card key={status.code}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className={`${getStatusColor(status.code)} border`}>
                  {status.code}
                </Badge>
                <CardTitle className="text-lg">{status.message}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{status.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStatuses.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No status codes found matching your search.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
