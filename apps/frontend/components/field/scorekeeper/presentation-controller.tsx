import React, { ReactElement, useRef } from 'react';
import { WithId } from 'mongodb';
import { Socket } from 'socket.io-client';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { DeckRef, DeckView } from '@lems/presentations';
import { Event, WSServerEmittedEvents, WSClientEmittedEvents } from '@lems/types';

interface PresentationControllerProps {
  event: WithId<Event>;
  presentationId: string;
  children: ReactElement;
  socket: Socket<WSServerEmittedEvents, WSClientEmittedEvents>;
}

const PresentationController: React.FC<PresentationControllerProps> = ({
  event,
  presentationId,
  children,
  socket
}) => {
  const deck = useRef<DeckRef>(null);

  const sendSlideUpdate = (newView: DeckView) => {
    const newState = {
      enabled: true,
      activeView: newView,
      pendingView: {
        slideIndex: 0,
        stepIndex: 0
      }
    };

    socket.emit('updatePresentation', event._id.toString(), presentationId, newState, response => {
      // { ok : true }
    });
  };

  const renderChildren = () => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        callback: sendSlideUpdate,
        ref: deck
      });
    });
  };

  return (
    <Stack component={Paper} p={4} mt={2} justifyContent="center">
      {renderChildren()}
      <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
        <IconButton onClick={deck.current?.stepForward}>
          <EastRoundedIcon fontSize="large" />
        </IconButton>
        <Typography>
          {deck.current?.activeView.slideIndex + 1} / {deck.current?.numberOfSlides}
        </Typography>
        <IconButton onClick={deck.current?.stepBackward}>
          <WestRoundedIcon fontSize="large" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default PresentationController;
