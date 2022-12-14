import {createLibp2p} from "libp2p"
import {createFromJSON} from "@libp2p/peer-id-factory"
import {webSockets} from "@libp2p/websockets"
import {noise} from "@chainsafe/libp2p-noise"
import {gossipsub} from "@chainsafe/libp2p-gossipsub"
import {mplex} from "@libp2p/mplex"
import {tcp} from "@libp2p/tcp"
import {pubsubPeerDiscovery} from "@libp2p/pubsub-peer-discovery"
import {multiaddr} from "@multiformats/multiaddr";

async function start() {
  const peerId = {
    id: "12D3KooWFYyvJysHGbbYiruVY8bgjKn7sYN9axgbnMxrWVkGXABF",
    privKey:
        "CAESYCtlyHA9SQ9F0yO6frmkrFFmboLCzGt8syr0ix8QkuTcVTVAp9JiBXb2xI1lzK6Fn2mRJUxtQIuuW+3V2mu3DZZVNUCn0mIFdvbEjWXMroWfaZElTG1Ai65b7dXaa7cNlg==",
    pubKey: "CAESIFU1QKfSYgV29sSNZcyuhZ9pkSVMbUCLrlvt1dprtw2W",
  }
  try {
    const libp2p = await createLibp2p({
      peerId: await createFromJSON(peerId),
      addresses: {
        listen: [
          "/ip4/127.0.0.1/tcp/5001/p2p/12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p/p2p-circuit",
        ],
      },
      pubsub: gossipsub({
        allowPublishToZeroPeers: true,
      }),
      transports: [tcp(), webSockets()],
      connectionEncryption: [noise()],
      streamMuxers: [mplex()],
      peerDiscovery: [
        // @ts-ignore package has broken typings
        pubsubPeerDiscovery({
          interval: 1000,
        }),
      ],
      relay: {
        // Circuit Relay options (this config is part of libp2p core configurations)
        enabled: true, // Allows you to dial and accept relayed connections. Does not make you a relay.
        autoRelay: {
          enabled: true,
          maxListeners: 2,
        },
      }
    })

    // Listen for new connections to peers
    libp2p.connectionManager.addEventListener("peer:connect", async (evt) => {
      const connection = evt.detail
      console.log(`Connected to ${connection.remotePeer.toString()}`)
    })

    // Listen for peers disconnecting
    libp2p.connectionManager.addEventListener("peer:disconnect", (evt) => {
      const connection = evt.detail
      console.log(`Disconnected from ${connection.remotePeer.toString()}`)
    })

    await libp2p.start()
    console.log("----------------------------------------------")
    console.log("PeerId:", libp2p.peerId.toString())
    console.log(
        "Listening on:",
        libp2p.getMultiaddrs().map((it) => it.toString()),
    )
    console.log("----------------------------------------------")


    const topic = "my_topic"
    libp2p.pubsub.subscribe(topic)
    libp2p.pubsub.addEventListener("message", (event) => {
      if (event.detail.topic !== topic) return
      console.log(
          "Received pubsub message from:",
          (event as any).detail.from.toString(),
      )
      console.log(">>", new TextDecoder().decode(event.detail.data))
    })

    setInterval(async () => {
      const peers = libp2p.pubsub.getSubscribers(topic)
      console.log({
        topic,
        peers: peers.map((it) => it.toString()),
      })
      let res = undefined
      try {
        res = await libp2p.ping(multiaddr("/ip4/127.0.0.1/tcp/5001/p2p/12D3KooWNvSZnPi3RrhrTwEY4LuuBeB6K6facKUCJcyWG1aoDd2p/p2p-circuit/p2p/12D3KooWLV3w42LqUb9MWE7oTzG7vwaFjPw9GvDqmsuDif5chTn9"))
      } catch (e) {}
      console.log("Ping:", res ? res : "unable to connect")
    }, 2000)

    return libp2p
  } catch (err) {
    console.error(err)
  }
}

start()
