'use client';
import { Card, Checkbox, Select, Tabs } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const { TabPane } = Tabs;
const { Meta } = Card;
const { Option } = Select;

export function AssetGrid(props: {
  assets: any;
  onSelection: any;
  isGallery: any;
  onSelect: any;
  selectedContent: any;
}) {
  const { assets, onSelection, isGallery, onSelect, selectedContent } = props;

  // const prevAssets = usePrevious(assets)
  const [assetCheckbox, setAssetCheckbox] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [content, setContent] = useState(selectedContent);

  useEffect(() => {
    //   if (prevAssets && prevAssets.length !== assets.length) {
    setSelectedAssets([]);
    //   }
  }, [assets]);

  useEffect(() => {
    setContent(selectedContent);
  }, [selectedContent]);

  return (
    <span style={{ display: 'flex', flexWrap: 'wrap' }}>
      {assets?.length ? (
        assets?.map(
          (
            asset: {
              url: any;
              name: any;
              streamingUrl?: any;
              id?: any;
              originalName?: any;
            },
            index: any
          ) => {
            const { name, url, streamingUrl, id, originalName } = asset;

            return (
              <span
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '190px',
                  alignItems: 'center',
                }}
              >
                <Card
                  key={name || `${id}-${index}`}
                  onMouseEnter={() => setAssetCheckbox(name)}
                  onMouseLeave={() => setAssetCheckbox('')}
                  onClick={() => {
                    if (isGallery) {
                      onSelect({ url: url || streamingUrl });
                      setContent(url || streamingUrl);
                    }
                  }}
                  hoverable
                  className={`assetContainer ${
                    isGallery && !(originalName || streamingUrl)
                      ? 'gallery-thumbnail'
                      : ''
                  } ${
                    content === (url || streamingUrl || false)
                      ? 'content-select'
                      : ''
                  }`}
                  cover={<Image className="thumbnail" src={''} alt={name} />}
                  style={{
                    width: streamingUrl || originalName ? '200px' : '',
                    height: streamingUrl || originalName ? '210px' : '',
                  }}
                  bodyStyle={{ padding: '0px' }}
                >
                  {!isGallery &&
                    //@ts-ignore

                    (assetCheckbox === name ||
                      //@ts-ignore

                      selectedAssets.indexOf(name || id) > -1) && (
                      <Checkbox
                        //@ts-ignore

                        defaultChecked={selectedAssets.indexOf(name || id) > -1}
                        className="checkbox"
                        onChange={(e: { target: { checked: any } }) => {
                          const uniqueIdentifier = name || id;

                          if (e.target.checked) {
                            //@ts-ignore

                            setSelectedAssets([
                              //@ts-ignore

                              ...selectedAssets,
                              //@ts-ignore

                              uniqueIdentifier,
                            ]);
                            onSelection([...selectedAssets, uniqueIdentifier]);
                          } else {
                            selectedAssets.splice(
                              //@ts-ignore

                              selectedAssets.indexOf(uniqueIdentifier),
                              1
                            );
                            setSelectedAssets([...selectedAssets]);
                            onSelection([...selectedAssets]);
                          }
                        }}
                      />
                    )}

                  {(originalName || streamingUrl) && (
                    <Meta
                      title={originalName || 'Video'}
                      style={{ marginTop: '8px', marginLeft: '8px' }}
                    />
                  )}
                </Card>
                <audio preload="none" controls style={{ width: '150px' }}>
                  <track />
                  <source
                    src={asset && asset.url ? asset.url : ''}
                    type="audio/ogg"
                  />
                  Your browser does not support the audio element.
                </audio>
                <p
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'center',
                    lineBreak: 'auto',
                    overflowWrap: 'break-word',
                  }}
                >
                  {asset && asset.name ? asset.name.split('audio/')[1] : ''}
                </p>
              </span>
            );
          }
        )
      ) : (
        <p>Empty</p>
      )}
    </span>
  );
}
