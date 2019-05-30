#!/usr/bin/env node

import amqp from "amqplib/callback_api";
import rabbitConnection from "../../index";

const urls =
  "amqp://ugothxkb:2CFdOCiOFadPfzL7OTu8yaeyUBC2w2zX@lion.rmq.cloudamqp.com/ugothxkb";
const url = "amqp://localhost";

export default class RabbitQP {
  constructor() {
    this.channel = "";
  }
  async createConnection() {
    return await amqp.connect(urls, (error, connection) => {
      if (error) {
        // console for now will add an error management helper
        console.log(error);
      }
      connection.on("error", err => {
        console.error("An error occured.", err.message);
      });
      connection.on("close", () => {
        console.log("this connection has been closed");
      });
      this.createsChannel(connection);
    });
  }

  closeConnection(connection) {
    connection.close();
    process.exit();
  }

  async createsChannel(connection) {
    const channel = await connection.createChannel((error, channel) => {
      if (error) {
        // console for now,I will add an error management helper
        console.log("[AMQP] channel error", error.message);
      }
      console.log("yaaaaa");
      return channel;
    });
    this.channel = channel;
    this.createQueue(channel);
    // console.log(this.channel, 'kkkklllkjhgxxxxx')
    return channel;
  }

  static startPublisher(connection, data) {
    connection.createChannel((error, channel) => {
      if (error) {
        // console for now,I will add an error management helper
        console.log(error);
      }
    });
  }

  static startworker(connection, data) {
    const {} = data;
    connection.createChannel((error, channel) => {
      if (error) {
        // console for now,I will add an error management helper
        console.log(error);
      }
    });
  }

  createExchange(channel) {
    this.channel = channel;
    return channel.assertExchange("chatt", "direct", { durable: false });
  }

  publishExchange(exchange, routingKey, content) {
    console.log("working heree.....");
    try {
      this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(content)),
        { persist: true }
      );
    } catch (error) {
      console.error("[AMPQ] error occured", error.message);
    }
  }

  createQueue(channel) {
    // const channel = this.channel;
    // console.log(this.channel, 'kkkklllkjhg')
    return channel.assertQueue(
      "process.chat",
      { exclusive: true },
      (error, q) => {
        if (error) {
          console.log(
            "[AMPQ] error occured while creating queue",
            error.message
          );
        }
        const routingKey = "process.chat";
        channel.bindQueue(q.queue, "chatto-app", routingKey);

        channel.consume(q.queue, msg => {
          const message = JSON.parse(msg.content);
        //   console.log(msg);
          setTimeout(() => {
              console.log(msg)
            const content = {
              msg: "Successfully added chart",
              id: "jkdid8993hd"
            };
            this.publishExchange(
              "chatto-app",
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(content))
            );
          }, 5000);
        //   channel.ack(msg);
        });

      }
    );
  }
}

// RabbitQP.handleEvent({ exchange: 'jobs', routingKey: '', content: { msg: 'Great this works', task: 'publish' }})
