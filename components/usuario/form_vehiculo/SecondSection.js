import React from 'react'
import { Dimmer, Loader, Grid, Segment } from "semantic-ui-react";
import ImageUpload from './ImageUpload';
export default function SecondSection() {
    const inputsList_one = [
        {
            principal: true,
            index: 1
        },
        {
            principal: false,
            index: 6
        },
        {
            principal: false,
            index: 9
        }
    ];
    const inputsList_two = [
        {
            principal: false,
            index: 2
        },
        {
            principal: false,
            index: 4
        },
        {
            principal: false,
            index: 7
        },
        {
            principal: false,
            index: 10
        }
    ];
    const inputsList_three = [
        {
            principal: false,
            index: 3
        },
        {
            principal: false,
            index: 5
        },
        {
            principal: false,
            index: 8
        }
    ];
    return (
        <Grid columns={3} divided>
            <style>
                {`
                    .ui.grid>.column:not(.row), .ui.grid>.row>.column {
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                    }
                    .columDrop {
                        padding: 0px !important;
                    }
                    .dzu-inputLabel {
                        color: #000;
                    }
                    .dzu-previewStatusContainer > progress {
                        display: none
                    }
                    .dzu-previewStatusContainer > span:last-child {
                        display: none
                    }
                `}
            </style>
            <Grid.Row stretched>
                <Grid.Column className="columDrop">
                    {inputsList_one.map((item, index) =>  
                        <ImageUpload 
                        key={item.index}
                        principal={item.principal}
                        index={item.index}
                        />
                    )}
                </Grid.Column>
                <Grid.Column className="columDrop">
                    {inputsList_two.map((item, index) =>  
                        <ImageUpload 
                        key={item.index}
                        principal={item.principal}
                        index={item.index}
                        />
                    )}
                </Grid.Column>
                <Grid.Column className="columDrop">
                    {inputsList_three.map((item, index) =>  
                        <ImageUpload 
                        key={item.index}
                        principal={item.principal}
                        index={item.index}
                        />
                    )}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
