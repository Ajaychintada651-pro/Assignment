import React, { useEffect } from 'react';

const Dummy = () => {
  useEffect(() => {
    const myWs = new WebSocket("wss://api.play.ai/v1/talk/AJay-QX0KgAetgdg92N37dvv3i");

    myWs.onopen = () => {
      console.log("WebSocket connection established.");

      const setupMessage = {
        type: "setup",
        apiKey: "ak-4a954a1e5ced4bffb469d82ea4ce609b",
        inputEncoding: "mulaw",
        inputSampleRate: 16000,
        outputFormat: "mp3",
        outputSampleRate: 24000,
      };
      myWs.send(JSON.stringify(setupMessage));
      startSendingAudio();
    };

    // myWs.onerror = (error) => {
    //   console.error("WebSocket error:", error);
    // };

    const startSendingAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = async (event) => {
          const base64Data = await blobToBase64(event.data);
          console.log("Sending audio data:.........");
          myWs.send(JSON.stringify({ type: "audioIn", data: base64Data }));
        };

        mediaRecorder.start(100); // Send data every 100ms
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    const blobToBase64 = (blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
      });
    };

    const startReceivingAudio = () => {
      myWs.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "audioStream") {
          const base64Data = message.data;
          playAudio(base64Data);
        }

        if (message.type === "voiceActivityStart") {
          console.log("User started speaking.");
        }

        if (message.type === "voiceActivityEnd") {
          console.log("User stopped speaking.");
        }

        if (message.type === "error") {
          console.error(`Error ${message.code}: ${message.message}`);
        }
      };
    };

    const playAudio = (base64Data) => {
      try {
        const audioBlob = base64ToBlob(base64Data, "audio/mp3");
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      } catch (error) {
        console.error("Error creating audio blob:", error);
      }
    };

    const base64ToBlob = (base64, mimeType) => {
      const byteChars = atob(base64);
      const byteNums = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNums[i] = byteChars.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNums);
      return new Blob([byteArray], { type: mimeType });
    };

    startReceivingAudio();

    return () => {
      console.log("Closing WebSocket...");
      myWs.close();
    };
  }, []);  // Ensure this effect runs only once, by adding an empty dependency array

  return <></>;
};

export default Dummy;
