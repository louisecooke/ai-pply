import { Button, ImageList, ImageListItem, Typography, Popover, Stack } from "@mui/material";

import * as React from "react";
import { Recommendation } from "../types";

type Props = {
  columns: number;
  content: any[];
  onFinish: Function;
  singleton: boolean;
  receiveRecommendation: Function;
  transparent: boolean;
};

export default function Gallery({ columns, content, onFinish, singleton, receiveRecommendation, transparent }: Props) {
  const [page, setPage] = React.useState(0);
  const numPhotos = columns * columns;
  const lastPage = ((page + 1) * numPhotos >= content.length);
  const [submittable, setSubmittable] = React.useState(true);
  const [error, setError] = React.useState(false);

  let recommendation = {index: -1, reason: ''} as Recommendation;

  const elements = () => {
    let pagedElements: {element: string, recommended: boolean}[] = [];
    recommendation = receiveRecommendation(page * numPhotos, (page + 1) * numPhotos);
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
        borderColor: '#590343',
    }


  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    transparent && selected && setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
      <>
      <Button key={element} onClick={toggleSelect}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      sx={selected ? selectedStyle : { border: 20, borderColor: 'gray' }} >
          <ImageListItem key={element} sx={{height: '160px', width: '220px'}}>
          {element}
          </ImageListItem>
      </Button>

      {recommended &&
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
    </>
  );
}

  return (
    <Stack justifyContent='flex-end' direction='row' spacing={6}>
        <ImageList cols={columns}>
          {elements()}
        </ImageList>
        <div>
        <Button color={error ? 'error' : 'secondary'} variant='contained' onClick={pageTurn} sx={{marginTop: 2}}>{lastPage ? "Finish" : "Next page"}</Button>
        </div>
    </Stack>
    );
}

