## Libp2p pubsub issue reproduction

### Reproduction

1. `npm i`
2. `npm run alice`
3. `npm run bob`
4. ensure both peers sees each other in subscribed topics
5. restart `bob`
6. `bob` does not see `alice` anymore.

### Explanation

The two peers - Alice and Bob, are connected to the same public wrtc server
(`/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star`) and subscribed to the same
topic (`my_topic`). When we run both peers at the same time, everything works as expected. But when we
restart one of the peers, it does not see another peer after restart.

**Alice logs:**

```shell
> ./node_modules/.bin/tsc && DEBUG=libp2p:gossipsub node _/alice.js

  libp2p:gossipsub starting +0ms
  libp2p:gossipsub started +33ms
  libp2p:gossipsub JOIN _peer-discovery._p2p._pubsub +539ms
----------------------------------------------
PeerId: 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9
Listening on: [
  '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9'
]
----------------------------------------------
  libp2p:gossipsub JOIN my_topic +10ms
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: unable to connect
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Connected to 12D3KooWBeQswproz2ieHCBj6RdEoujY6X98ptfUS9oz9RX5iXJz
Connected to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
  libp2p:gossipsub new peer 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +5s
  libp2p:gossipsub Added peer has no IP in current address 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF /dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
Ping: 1359
  libp2p:gossipsub create inbound stream 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +19ms
  libp2p:gossipsub create outbound stream 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +11ms
  libp2p:gossipsub send subscriptions to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +1ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +8ms
  libp2p:gossipsub subscription update from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF topic _peer-discovery._p2p._pubsub +0ms
  libp2p:gossipsub subscription update from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF topic my_topic +0ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +28ms
Connected to 12D3KooWBeQswproz2ieHCBj6RdEoujY6X98ptfUS9oz9RX5iXJz
  libp2p:gossipsub HEARTBEAT: Add mesh link to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF in _peer-discovery._p2p._pubsub +131ms
  libp2p:gossipsub HEARTBEAT: Add mesh link to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF in my_topic +0ms
Connected to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
  libp2p:gossipsub new peer 12D3KooWBeQswproz2ieHCBj6RdEoujY6X98ptfUS9oz9RX5iXJz +187ms
  libp2p:gossipsub Added peer has no IP in current address 12D3KooWBeQswproz2ieHCBj6RdEoujY6X98ptfUS9oz9RX5iXJz /dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +0ms
{
  topic: '_peer-discovery._p2p._pubsub',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
{
  topic: 'my_topic',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
Ping: 12
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +997ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +1s
{
  topic: '_peer-discovery._p2p._pubsub',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
{
  topic: 'my_topic',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
Ping: 29
```

Alice connects to the Bob and sees Bob peerId (`12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF`) 
in the list of topics.
The same logs displayed in Bob side.

Now, we restart Bob.

**Alice logs:**

```shell
Connected to 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
  libp2p:gossipsub replacing existing inbound steam 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +17s
  libp2p:gossipsub create inbound stream 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +0ms
  libp2p:gossipsub rpc from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF +10ms
  libp2p:gossipsub subscription update from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF topic _peer-discovery._p2p._pubsub +0ms
  libp2p:gossipsub subscription update from 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF topic my_topic +0ms
Ping: unable to connect
{
  topic: '_peer-discovery._p2p._pubsub',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
{
  topic: 'my_topic',
  peers: [ '12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF' ]
}
```

Alice connected to Bob, but `ping` is failing now.

**Bob logs:**

```shell
> ./node_modules/.bin/tsc && DEBUG=libp2p:gossipsub node _/bob.js

  libp2p:gossipsub starting +0ms
  libp2p:gossipsub started +31ms
  libp2p:gossipsub JOIN _peer-discovery._p2p._pubsub +797ms
----------------------------------------------
PeerId: 12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF
Listening on: [
  '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF'
]
----------------------------------------------
  libp2p:gossipsub JOIN my_topic +9ms
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Connected to 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9
  libp2p:gossipsub new peer 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +3s
  libp2p:gossipsub Added peer has no IP in current address 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 /dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +0ms
Ping: 1368
  libp2p:gossipsub create outbound stream 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +19ms
  libp2p:gossipsub send subscriptions to 12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9 +0ms
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: 16
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: 16
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: 18
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: 17
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: 18
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: 17
{ topic: '_peer-discovery._p2p._pubsub', peers: [] }
{ topic: 'my_topic', peers: [] }
Ping: 15
```

Bob connects to Alice, `ping` command works, but Bob does not see Alice in subscribed topics. 

