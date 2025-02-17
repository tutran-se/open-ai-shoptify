import { Box, HStack, Tag, Text, WrapItem } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineSetting } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";
import { auth } from "../../config/firebase";
import { format, formatDistance } from "date-fns";
import { updateLike } from "../../libs/feeds";
import Image from "next/image";

const ResultItem = ({ item }) => {
  const {
    answer,
    createdAt,
    prompt,
    totalLike,
    whoLikes,
    engineId,
    creator: { displayName, photoURL },
  } = item;
  const user = auth.currentUser;
  const isLikedByCurrentUser =
    whoLikes.find((item) => item === user.uid) || false;
  return (
    <Box
      border={"1px"}
      borderColor="gray.600"
      rounded="md"
      boxShadow="lg"
      position="relative"
    >
      <Box bg={"whiteAlpha.200"} p={2}>
        <HStack>
          <Tooltip label={displayName}>
            <WrapItem
              cursor="pointer"
              position={"relative"}
              overflow="hidden"
              width={"35px"}
              height="35px"
              borderRadius={"100%"}
            >
              <Image
                src={photoURL}
                alt="avatar"
                objectFit="cover"
                layout="fill"
              />
            </WrapItem>
          </Tooltip>

          <Box>
            <Text fontSize={14} fontWeight="medium">
              {prompt}
            </Text>
            {createdAt && (
              <Text fontSize={12} color="gray.400">
                {formatDistance(new Date(createdAt?.toDate()), new Date(), {
                  addSuffix: true,
                })}
                &nbsp;({format(new Date(createdAt?.toDate()), "dd MMM, yyyy")})
              </Text>
            )}
            <Text mt={2}>
              <Tag colorScheme="green">
                <AiOutlineSetting />
                &nbsp;{String(engineId).split("-")[1]}
              </Tag>
            </Text>
          </Box>
        </HStack>
      </Box>
      <Text padding={4} fontSize={14} fontStyle="italic">
        &quot;{answer.trim()}&quot;
      </Text>
      <Text
        px={4}
        fontSize={12}
        fontStyle="italic"
        color={"gray.400"}
        textAlign="right"
      >
        🤖 Open AI
      </Text>

      <HStack p={4}>
        <Text fontSize={14} hidden={totalLike === 0}>
          {totalLike}
        </Text>

        {isLikedByCurrentUser && (
          <AiFillHeart
            color="#ff6c6c"
            cursor={"pointer"}
            onClick={() => updateLike({ action: "REMOVE_LIKE", item })}
          />
        )}
        {!isLikedByCurrentUser && (
          <AiOutlineHeart
            color="#ff6c6c"
            cursor={"pointer"}
            onClick={() => updateLike({ action: "LIKE", item })}
          />
        )}
      </HStack>
    </Box>
  );
};

export default ResultItem;
