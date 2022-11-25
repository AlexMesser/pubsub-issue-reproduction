## Libp2p pubsub issue reproduction

### Reproduction

1. `npm i`
2. `npm run relay`
3. `npm run alice`
4. `npm run bob`
5. ensure both peers sees each other in subscribed topics:
```shell
{
  topic: 'my_topic',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
```
6. watch `alice` logs and wait for `bob` reconnect:
```shell
Disconnected from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
Connected to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF

```
7. both `alice` and `bob` does not see each other anymore:
```shell
{ topic: 'my_topic', peers: [] }
```
8. stop and rerun `bob` manually - peers sees each other again until reconnect.

### Explanation

`12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9` - Alice peer id.
`12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF` - Bob peer id.
`12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p` - relay server peer id.

The two peers - Alice and Bob, are connected to the same relay server and subscribed to the same
topic (`my_topic`). When we run both peers the first time, everything works as expected. But when some 
of the peers reconnects, they does not see each other in topic subscription anymore. Also we sending `ping`
command every 2 seconds (`alice` pings `bob` and vice-versa) and it returns successful result even when peers does not see each other in topic subscribers.

**Alice logs:**

```shell
> ./node_modules/.bin/tsc && DEBUG=libp2p:gossipsub,libp2p:connection-manager node _/alice.js

  libp2p:connection-manager started +7ms
  libp2p:gossipsub starting +0ms
  libp2p:connection-manager dial to 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +30ms
  libp2p:connection-manager dial to 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +5ms
  libp2p:gossipsub started +34ms
  libp2p:gossipsub JOIN _peer-discovery._p2p._pubsub +131ms

----------------------------------------------
PeerId: 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9
Listening on: [
  '/ip4/127.0.0.1/tcp/5001/p2p/12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p/p2p-circuit/p2p/12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9'
]
----------------------------------------------
    libp2p:gossipsub JOIN my_topic +6ms
  libp2p:gossipsub new peer 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +36ms
  libp2p:gossipsub create inbound stream 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +1ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +12ms
  libp2p:gossipsub subscription update from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p topic _peer-discovery._p2p._pubsub +0ms
  libp2p:gossipsub create outbound stream 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +1ms
  libp2p:gossipsub send subscriptions to 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +1ms
  libp2p:connection-manager dial to 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +207ms
  libp2p:connection-manager had an existing connection to 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +0ms
  libp2p:connection-manager dial to 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +12ms
  libp2p:connection-manager had an existing connection to 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +0ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +656ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +17ms
  libp2p:gossipsub GRAFT: Add mesh link from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p in _peer-discovery._p2p._pubsub +1ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +907ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +76ms
{ topic: 'my_topic', peers: [] }
  libp2p:connection-manager dial to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +2s
Connected to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
  libp2p:gossipsub new peer 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +417ms
  libp2p:gossipsub create inbound stream 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +13ms
Ping: 135
  libp2p:gossipsub create outbound stream 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +15ms
  libp2p:gossipsub send subscriptions to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +9ms
  libp2p:gossipsub subscription update from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF topic _peer-discovery._p2p._pubsub +0ms
  libp2p:gossipsub subscription update from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF topic my_topic +0ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +451ms
  libp2p:gossipsub GRAFT: Add mesh link from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF in _peer-discovery._p2p._pubsub +0ms
  libp2p:gossipsub GRAFT: Add mesh link from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF in my_topic +0ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +20ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +11ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +64ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +9ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +299ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +619ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +8ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +66ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +10ms
{
  topic: 'my_topic',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
  libp2p:connection-manager dial to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +2s
  libp2p:connection-manager had an existing connection to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +298ms
Ping: 31
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +619ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +7ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +65ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +8ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +305ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +616ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +10ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +62ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +11ms
{
  topic: 'my_topic',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
```

Alice connects to the Bob and sees Bob peerId (`12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF`) 
in the list of topics.
The same logs displayed in Bob side.

Now bob reconnects:

**Alice logs:**

```shell
Disconnected from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
  libp2p:gossipsub connection ended 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +293ms
  libp2p:gossipsub delete peer 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
  libp2p:gossipsub connection ended 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
  libp2p:gossipsub connection ended 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
Ping: unable to connect
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +620ms
Connected to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
Connected to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +82ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +920ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +77ms
{ topic: 'my_topic', peers: [] }
  libp2p:connection-manager dial to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +2s
  libp2p:connection-manager had an existing connection to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
Ping: 18
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +922ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +79ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +925ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +74ms
{ topic: 'my_topic', peers: [] }
  libp2p:connection-manager dial to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +2s
  libp2p:connection-manager had an existing connection to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
Ping: 18
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +927ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +72ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +929ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +72ms
{ topic: 'my_topic', peers: [] }

```

Alice does not see Bob in topic subscribers, but `ping` successfully returns value.

**Bob logs:**

```shell
Disconnected from 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9
  libp2p:gossipsub connection ended 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +287ms
  libp2p:gossipsub delete peer 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +1ms
  libp2p:gossipsub connection ended 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +0ms
  libp2p:gossipsub connection ended 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +0ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +5ms
{ topic: 'my_topic', peers: [] }
  libp2p:connection-manager dial to 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +2s
Connected to 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +702ms
Connected to 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9
Ping: 141
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +297ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +700ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +304ms
{ topic: 'my_topic', peers: [] }
  libp2p:connection-manager dial to 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +2s
  libp2p:connection-manager had an existing connection to 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +0ms
Ping: 18
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +698ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +300ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +699ms
  libp2p:gossipsub rpc from 12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p +302ms
{ topic: 'my_topic', peers: [] }
```

Now if we restart bob manually, everything works again - peers sees each other in topic subscribers. 

