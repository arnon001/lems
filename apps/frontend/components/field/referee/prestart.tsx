import { WithId } from 'mongodb';
import dayjs from 'dayjs';
import {
  Paper,
  Stack,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  ThemeProvider
} from '@mui/material';
import { RobotGameMatch, RobotGameMatchParticipant } from '@lems/types';
import { localizeTeam } from '../../../localization/teams';
import PresentSwitch from './present-switch';

interface MatchPrestartProps {
  participant: RobotGameMatchParticipant;
  match: WithId<RobotGameMatch>;
  updateMatchParticipant: (match: Partial<RobotGameMatchParticipant>) => void;
  inspectionStatus?: boolean | null;
  updateInspectionStatus?: (value: boolean | null) => void;
}

const MatchPrestart: React.FC<MatchPrestartProps> = ({
  participant,
  match,
  updateMatchParticipant,
  inspectionStatus,
  updateInspectionStatus
}) => {
  return (
    <Paper sx={{ mt: 4, p: 4 }}>
      {participant.team && (
        <>
          <Typography fontSize="1.5rem" fontWeight={700}>
            הכנה למקצה {match.number} ({dayjs(match.scheduledTime).format('HH:mm')})
          </Typography>

          <Typography color="textSecondary" fontSize="1.125rem" mb={4}>
            {localizeTeam(participant.team)}
          </Typography>

          {participant.team.registered ? (
            <PresentSwitch
              value={participant.present}
              onChange={present => {
                updateMatchParticipant({ present });
                if (updateInspectionStatus) updateInspectionStatus(null);
              }}
            />
          ) : (
            <Typography fontSize="1.125rem" fontWeight={700} color="#f57c00">
              שימו לב: הקבוצה טרם הגיעה לאירוע
            </Typography>
          )}

          {updateInspectionStatus &&
            participant.team.registered &&
            participant.present === 'present' && (
              <ThemeProvider
                theme={outerTheme => ({
                  ...outerTheme,
                  MuiToggleButton: {
                    styleOverrides: {
                      root: {
                        '&.Mui-selected': {
                          '&:hover': {
                            color: '#fff',
                            backgroundColor: '#81c784'
                          },
                          color: '#fff',
                          backgroundColor: '#388e3c'
                        }
                      }
                    }
                  }
                })}
              >
                <Typography fontSize="1rem" sx={{ mt: 4 }}>
                  <b>ביקורת ציוד:</b> הרובוט וכל הציוד שלכם נכנסים לחלוטין לתוך אחד מאזורי השיגור
                  והגובה שלהם הוא מתחת ל-305 מ״מ (12 אינץ׳) בזמן ביקורת הציוד שלפני המקצה:{' '}
                </Typography>
                <ToggleButtonGroup
                  sx={{ mt: 2 }}
                  exclusive
                  value={inspectionStatus}
                  onChange={(_e, value) => value !== null && updateInspectionStatus(value)}
                >
                  <ToggleButton value={false} sx={{ minWidth: '80px' }}>
                    לא
                  </ToggleButton>
                  <ToggleButton value={true} sx={{ minWidth: '80px' }}>
                    כן
                  </ToggleButton>
                </ToggleButtonGroup>
              </ThemeProvider>
            )}

          <Stack alignItems="center" mt={6}>
            <Button
              onClick={() => updateMatchParticipant({ ready: true })}
              variant="contained"
              color="primary"
            >
              {participant.team.registered ? 'אנחנו מוכנים!' : 'מוכנים ומאשרים שהקבוצה חסרה'}
            </Button>
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default MatchPrestart;
