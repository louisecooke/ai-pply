
import { Button, ImageList, ImageListItem, Typography, Popover, Stack } from "@mui/material";

import * as React from "react";
import { Recommendation } from "../types";

type Props = {
  dimensions: {
    columns: number;
    rows: number;
  };
  content: any[];
  onFinish: Function;
  singleton?: boolean;
  receiveRecommendation: Function;
  transparent: boolean;
  changes: number;
  runTimer: Function;
};

export default function Gallery({ dimensions, content, onFinish, singleton = true, receiveRecommendation, transparent, changes, runTimer }: Props) {
  const [page, setPage] = React.useState(0);
  const numPhotos = dimensions.columns * dimensions.rows;
  const lastPage = ((page + 1) * numPhotos >= content.length);
  const [submittable, setSubmittable] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState(receiveRecommendation(page * numPhotos, (page + 1) * numPhotos));

  React.useEffect( () => {
    setRecommendation(receiveRecommendation(page * numPhotos, (page + 1) * numPhotos));
  }, [changes]);

  const elements = () => {
    let pagedElements: {element: string, recommended: boolean}[] = [];
    for (let i = page * numPhotos; i < (page + 1) * numPhotos; i++) {
        let tuple = {element: content[i], recommended: (content[i].key == recommendation.index)};
        pagedElements.push(tuple);
    }
    return pagedElements.map((tuple) => Selectable(tuple.element, tuple.recommended, submittable, setSubmittable, recommendation, singleton));
    }

  const pageTurn = () => {
    if (lastPage) {
      onFinish();
    }
    if (!singleton || submittable) {
      setError(false);
      setRecommendation(receiveRecommendation((page + 1) * numPhotos, (page + 2) * numPhotos));
      setPage(page + 1);
      setSubmittable(true);
    } else {
      setError(true);
    }
  }

  const Selectable = (element: any, recommended: boolean, submittable: boolean, setSubmittable: Function, recommendation: Recommendation, singleton?: boolean) => {
    const [selected, setSelected] = React.useState(recommended);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        setSelected(recommended);
    }, [element]);

    const toggleSelect = () => {
        if (selected) {
          setSelected(false);
          if (singleton) {
            setSubmittable(false);
          }
        } else {
          if (!singleton || !submittable) {
            setSelected(true);
            setSubmittable(true);
          }
        }
    }

    const selectedStyle = { border: 20,
      borderColor: (theme) => theme.palette.secondary.main,
    }

    const defaultStyle = {
      border: 20,
      borderColor: (theme) => theme.palette.tertiary.main
    }

  React.useEffect(() => {
    let interval;
    if (anchorEl && recommended) {
    interval = setInterval(() => {
        runTimer();
      }, 10);
    } else if (!anchorEl) {
        clearInterval(interval);
    }
    return () => clearInterval(interval as NodeJS.Timer);

  }, [anchorEl]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    transparent && selected && setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
      <React.Fragment key={element.key}>
      <Button onClick={toggleSelect}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      sx={selected ? selectedStyle : defaultStyle}>
          <ImageListItem key={element.key} sx={{height: '160px', width: '220px'}}>
          {element}
          </ImageListItem>
      </Button>

      {recommended && transparent &&
      <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Typography sx={{ p: 1 }}>{recommendation.reason}</Typography>
    </Popover>}
    </React.Fragment>
  );
}

  return (
    <Stack alignItems='flex-end' direction='column' spacing={6} sx={{marginTop: 0}}>
       <div>
        <Button color={error ? 'error' : 'secondary'} variant='contained' onClick={pageTurn} sx={{marginTop: 2}}><Typography fontSize='14px'>{lastPage ? "Finish" : "Next"}</Typography></Button>
        </div>
        <ImageList cols={dimensions.columns}>
          {elements()}
        </ImageList>
    </Stack>
    );
}

