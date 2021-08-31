import { useState } from 'react';
import { Chip } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import useGetSortedTags from '../services/useGetSortedTags';
import { Entry } from '../../../types';

const useStyles = makeStyles(theme => ({
  tags: {
    height: 32,
    display: 'flex',
    overflow: 'scroll',
    marginBottom: theme.spacing(3),

    '&::-webkit-scrollbar': {
      display: 'none',
    },

    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  dateWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

type Props = {
  entryData?: Partial<Entry>;
};

export default function EditorMeta({ entryData }: Props) {
  const classes = useStyles();

  const { data: tagsData } = useGetSortedTags(entryData?.tags);
  const [date, setDate] = useState(entryData?.date?.toISOString().substring(0, 10));
  const [time, setTime] = useState(entryData?.date?.toISOString().substring(11, 16));
  const [tags, setTags] = useState<{ [tagId: string]: boolean }>(
    entryData?.tags
      ? entryData.tags.reduce<{ [key: string]: boolean }>((acc, val) => {
          acc[val] = true;
          return acc;
        }, {})
      : {}
  );

  const handleSetTag = (itemId: string) =>
    setTags(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));

  return (
    <>
      <div className={classes.tags}>
        {tagsData?.map(item => (
          <Chip
            key={item.id}
            onClick={() => handleSetTag(item.id)}
            // onDelete={tags[item.id] ? () => handleSetTag(item.id) : undefined}
            color={tags[item.id] ? 'primary' : undefined}
            label={item.label}
            // deleteIcon={tags[item.id] ? <DoneIcon /> : undefined}
          />
        ))}
      </div>
      {entryData?.date && (
        <div className={classes.dateWrapper}>
          <TextField
            variant="outlined"
            id="time"
            label="Time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
          <TextField
            variant="outlined"
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
