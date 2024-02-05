import { ObjectId } from 'mongodb';
import { AudienceDisplayScreen } from '../constants';

export interface PresentationState {
  enabled: boolean;
  activeView: {
    slideIndex: number;
    stepIndex: number;
  };
}

export interface ScoreboardState {
  showCurrentMatch: false | 'timer' | 'no-timer';
  showPreviousMatch: boolean;
  showSponsors: boolean;
}

export interface AudienceDisplayState {
  screen: AudienceDisplayScreen;
  message: string;
  scoreboard: ScoreboardState;
}

export interface EventState {
  eventId: ObjectId;
  loadedMatch: ObjectId | null;
  activeMatch: ObjectId | null;
  currentStage: 'practice' | 'ranking';
  currentSession: number;
  audienceDisplay: AudienceDisplayState;
  presentations: { [key: string]: PresentationState };
  completed: boolean;
}
