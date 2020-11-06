//
//  StringProvider.m
//  nativenotes
//
//  Created by Parker Cooper on 11/5/20.
//

#import "StringProvider.h"

@implementation StringProvider
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(getParkersString:(RCTResponseSenderBlock)callback)
{
  //Change this depending on what you want to retrieve
  NSString* someString = @"Hello from Objective C";

  callback(@[someString]);
}

@end

